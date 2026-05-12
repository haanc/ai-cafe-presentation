# Azure NetApp Files Tech Sharing — 演讲稿

> **Presenter**: Han Cao (Azure Specialized)
> **时长**: 60 分钟（50 分钟内容 + 10 分钟 Q&A）
> **受众**: 有 Azure 基础，没用过 ANF 的技术同事

---

## Part 1: Introduction to Azure NetApp Files (5 min)

### 开场（Slide: Title）

大家好，我是 Han Cao，来自 Azure Specialized 团队。

今天我们来聊一个在日常支持和架构讨论中高频出现的话题——**Azure NetApp Files**。

### 为什么要讲这个？（Slide: Why ANF?）

我相信大家都遇到过这样的场景：

- 客户说"我需要一个高性能共享文件存储"，你第一反应是 Azure Files 还是 ANF？
- 客户的 workload 对 IOPS、吞吐、延迟都很敏感——ANF 的 service level 怎么选？
- NFS、SMB、快照、备份、复制……功能很多，但真正落地的最佳实践是什么？

这些看似是存储问题，**其实是性能与架构的问题**。今天用一小时把关键脉络理清楚。

### ANF 是什么？（Slide: What is ANF?）

一句话：**Azure NetApp Files 是跑在 Azure 数据中心里的 NetApp ONTAP bare-metal 存储服务。**

关键点：
- 这不是一个模拟 NetApp 的软件层——这是真正的 NetApp 硬件，部署在 Azure 数据中心的机架上
- 作为 Azure first-party service 管理，通过 Azure Portal/CLI/API 操作
- **亚毫秒级延迟**（< 1ms random I/O），这是它和 Azure Files 最本质的差异
- 支持 NFS + SMB + 双协议，天然适合混合环境

### 定位（Slide: Positioning）

简单说：
- **Azure Files** = Azure 平台原生文件存储，够用、便宜、简单
- **Azure NetApp Files** = 企业级高性能文件存储，面向 SAP HANA、HPC、Oracle、AI/ML 这类对延迟和吞吐有极致要求的场景

> 💡 过渡语：了解了 ANF 是什么之后，我们来看它的架构是怎么组织的。

---

## Part 2: Storage Hierarchy and Architecture (7 min)

### 三层架构（Slide: Storage Hierarchy）

ANF 的资源组织分三层，这个必须理解清楚：

```
Azure Subscription
  └── NetApp Account（区域级别，管理分组）
        └── Capacity Pool（容量池，绑定一个 Service Level）
              └── Volume（卷，实际存储数据的单元）
```

**NetApp Account：**
- 区域级别的逻辑容器，类似一个管理边界
- 注意：**这不是 Azure Storage Account**，完全不同的概念
- 每个 subscription 每个 region 最多 100 个 account

**Capacity Pool：**
- 这是容量和性能的计费单位——按**预配置容量**计费，不是按实际消耗
- 最小 1 TiB，最大 2048 TiB
- **每个 pool 绑定一个 service level**——不能在同一个 pool 里混搭 Standard 和 Ultra
- QoS 模式：Auto（默认，容量决定吞吐）或 Manual（手动分配吞吐到各卷）

**Volume：**
- 常规卷：50 GiB ~ 100 TiB
- 大型卷（Large Volume）：50 TiB ~ 1 PiB（breakthrough mode 可到 2 PiB）
- 支持在线调整大小，不停机
- 每个卷最多 255 个快照

### 网络架构（Slide: Networking）

这是很多人会踩坑的地方：

- ANF 卷部署在你 VNet 的一个**委托子网**里（delegation: `Microsoft.NetApp/volumes`）
- **每个 VNet 只能有一个 ANF 委托子网**
- 子网大小建议：SAP 场景用 /25，其他场景 /26
- **没有公网访问**——只能通过 VNet、VNet Peering、ExpressRoute、VPN 访问

网络功能方面，推荐使用 **Standard network features**：
- 支持 NSG、UDR、Private Endpoint
- 支持跨区域 VNet Peering
- 支持 ExpressRoute FastPath

> 💡 过渡语：架构清楚了，那每一层的性能怎么定义？这就涉及到 Service Level 的选择。

---

## Part 3: Service Levels and Performance Tiers (8 min)

### Service Level 概览（Slide: Service Levels）

ANF 有五个 service level，核心区别就是**每 TiB 提供的吞吐量**：

| Service Level | 吞吐 / TiB | 适用场景 |
|--------------|-----------|---------|
| **Standard** | 16 MiB/s | 备份目标、冷数据文件共享 |
| **Premium** | 64 MiB/s | 企业应用、SQL Server、SAP NetWeaver |
| **Ultra** | 128 MiB/s | SAP HANA 数据卷、HPC、EDA |
| **Flexible** | 可解耦（手动 QoS） | 需要独立控制容量和吞吐的场景（Oracle、SAP） |
| **Elastic**（预览）| 32 MiB/s（共享 QoS）| 内置跨 AZ 冗余，关键业务 HA |

### 吞吐计算（Slide: Throughput Formula）

**Auto QoS（默认）：**

```
吞吐上限 = 卷大小 (TiB) × Service Level 速率
例：2 TiB Premium 卷 = 2 × 64 = 128 MiB/s
```

这意味着什么？如果你需要更高的吞吐，要么加大卷的配额，要么换更高的 service level。

**Manual QoS：**

```
池总吞吐 = 池大小 (TiB) × Service Level 速率
你自己决定每个卷分多少吞吐
例：10 TiB Ultra 池 = 10 × 128 = 1,280 MiB/s 总预算
```

Manual QoS 的好处：一个小卷也能分到很高的吞吐——典型场景是 SAP HANA 的 log 卷（容量小但吞吐要求高）。

### IOPS 上限（Slide: IOPS Limits）

| 层级 | 最大卷 IOPS |
|-----|-----------|
| Ultra / Premium / Flexible | 450,000 |
| Standard | 320,000 |
| Elastic | 128,000 |

### 选型决策树（Slide: Decision Tree）

给大家一个简单的选型思路：

1. **延迟 < 1ms 是硬需求？** → 用 ANF（不是 Azure Files）
2. **需要跨 AZ 冗余？** → 考虑 Elastic（预览中）
3. **SAP HANA / HPC / AI-ML？** → Ultra 或 Flexible
4. **一般企业应用？** → Premium（最常用的选择）
5. **备份/归档？** → Standard

还有一个重要能力：**你可以在不同 service level 的 pool 之间移动卷，不停机、不搬数据**。这意味着你可以先用 Ultra 做初始数据加载，完成后降到 Premium 或 Standard 省成本。

### Cool Access（Slide: Cool Access Tiering）

ANF 支持自动冷热分层：
- 超过设定天数（2~183 天）没被访问的数据块自动移到冷层（Azure Blob Storage）
- 元数据**永远在热层**——不影响文件列表操作
- 随机读取会把数据 warm back 到热层
- 大型卷 + Cool Access 最大可到 **7.2 PiB**

适合场景：>50% 数据是冷数据的环境（完成的项目、历史数据集、合规归档）。

> 💡 过渡语：性能搞清楚了，下面看协议支持——这直接决定你的 workload 能不能跑在 ANF 上。

---

## Part 4: Protocol Support (5 min)

### 协议全景（Slide: Protocol Overview）

| 协议 | 版本 | 说明 |
|-----|-----|-----|
| **NFS** | NFSv3, NFSv4.1 | NFSv4.1 支持 Kerberos 加密传输（AES-256） |
| **SMB** | 2.1, 3.0, 3.1.1 | 支持 Multichannel、Continuous Availability |
| **双协议** | NFS + SMB 同一卷 | Linux 和 Windows 客户端同时访问同一份数据 |
| **Object REST** | S3 兼容 | 对接 AI/ML 服务、Microsoft Fabric |

### 双协议的价值（Slide: Dual Protocol）

这是 ANF 的一个杀手级特性——Azure Files 不支持双协议。

典型场景：
- SAP 环境：Linux 应用服务器（NFS）+ Windows 管理工具（SMB）访问同一组数据
- 开发团队：Linux build server + Windows 开发机共享代码库
- 数据分析：Linux 计算节点 + Windows BI 工具访问同一数据湖

### 身份与认证（Slide: Identity Integration）

- SMB：Active Directory、Microsoft Entra Domain Services
- NFS：ADDS/LDAP 集成，支持扩展组
- 双协议：LDAP over TLS
- 支持的目录服务：AD DS、FreeIPA、OpenLDAP、Red Hat Directory Server

### 加密（Slide: Encryption）

- **静态加密**：AES-256，支持 Microsoft 管理密钥或客户管理密钥
- **传输加密**：
  - SMB 3.0: AES-CCM / SMB 3.1.1: AES-GCM
  - NFS: NFSv4.1 Kerberos AES-256

> 💡 过渡语：数据能存进去了，怎么保护？接下来看数据保护和高可用。

---

## Part 5: Data Protection and High Availability (8 min)

### 数据保护全景（Slide: Data Protection Overview）

ANF 的数据保护是分层的，从近到远：

```
快照 (Snapshots) → 备份 (Backup) → 跨 AZ 复制 (CZR) → 跨区域复制 (CRR)
```

### 快照（Slide: Snapshots）

- **块级增量**——只存储变化的块，几乎不占额外空间
- 每卷最多 255 个快照
- 操作：恢复到新卷（秒级克隆）、就地回滚、单文件恢复
- 支持应用一致性快照（通过 AzAcSnap 或 SnapCenter）
- 底层使用 **RAID-DP（双重奇偶校验）**，能承受两块磁盘同时故障

### 备份（Slide: Backup）

- 完全托管，备份到 Azure Storage（独立于快照）
- 支持策略驱动（日/周/月），总计最多 1019 个备份点
- 恢复到同区域的新卷

### 复制（Slide: Replication）

**跨 AZ 复制（CZR）：**
- 同区域内不同可用区之间异步复制
- 无数据传输费用
- 调度：每 10 分钟 / 每小时 / 每天

**跨区域复制（CRR）：**
- 异步复制到 Microsoft 指定的配对区域
- 只复制变化的块——高效且低成本
- RPO：约 20 分钟（10 分钟调度）~ 约 48 小时（每日调度）
- RTO：打断 peering 约 1 分钟完成

> ⚠️ 重点提醒：CRR 和 CZR 的 failover 都是**手动**操作——需要打断 peering + 挂载目标卷。你需要自己检测故障并发起切换。

### 高可用（Slide: High Availability）

**可用区卷放置（AZ Volume Placement）：**
- 将卷部署到特定 AZ，和计算资源同区域
- 一旦设置，**不可更改、不可移动**
- 无额外费用

**Elastic 弹性区域冗余存储（预览）：**
- 平台级跨 AZ 冗余——整个 AZ 宕机也不丢数据
- 低毫秒延迟
- 当前 13 个区域可用

**Application Volume Groups（SAP HANA）：**
- 一次性原子部署所有 SAP 相关卷（data、log、shared、backup）
- 根据数据库内存自动计算卷大小和吞吐
- 数据卷和日志卷分配到不同存储端点（不同 IP）——更好的性能隔离

> 💡 过渡语：功能讲完了，看看实际场景——ANF 到底用在哪？

---

## Part 6: Common Use Cases and Workload Scenarios (7 min)

### SAP HANA — ANF 的旗舰场景（Slide: SAP HANA）

SAP HANA 是 ANF 最成熟、最深度集成的场景：
- 通过 Application Volume Groups 一键部署最佳实践存储架构
- data / log / shared / backup 卷各有优化
- 支持 HSR（HANA System Replication）
- 通过 AzAcSnap 做应用一致性快照
- Manual QoS 或 Flexible 让 log 卷（小容量高吞吐）得到充分性能

### 数据库（Slide: Databases）

- **Oracle**：多卷和单卷性能架构，Ultra/Flexible 级别
- **SQL Server**：SMB 卷，Always-On AG、FCI over SMB，T-SQL 快照备份集成
- **其他**：Db2、SAP ASE、MaxDB 都有文档化的部署指南

### HPC & EDA（Slide: HPC）

- 油气勘探：储层模拟
- 电子设计自动化（EDA）——SPECstorage 验证
- Azure Batch + ANF 的 MPI 工作负载
- CycleCloud HPC 环境

### AI/ML（Slide: AI/ML）

- Azure ML Studio 集成的高性能训练存储
- NVIDIA 分布式 ML 训练
- 企业级 RAG 管线（NVIDIA AI Blueprint + ANF）
- S3 兼容 Object REST API 对接 Microsoft Fabric

### VDI（Slide: VDI）

- Azure Virtual Desktop：FSLogix 用户配置文件存在 ANF 上
- Citrix 环境的 Profile Management
- MSIX App Attach

### 企业文件共享（Slide: Enterprise File Shares）

- Windows/Linux 混合文件共享 + DFS Namespaces + CRR 做 DR
- 用户主目录
- Global File Cache 实现分布式访问

> 💡 过渡语：那么核心问题来了——什么时候用 ANF，什么时候用 Azure Files？

---

## Part 7: ANF vs Azure Files Comparison (8 min)

### 对比总览（Slide: Comparison Table）

| 维度 | Azure NetApp Files | Azure Files |
|-----|-------------------|-------------|
| **底层技术** | NetApp bare-metal ONTAP | Azure Storage 平台 |
| **延迟** | **< 1ms** | 2-3ms |
| **最大吞吐/卷** | 4.5 GiB/s（常规）, 12.5 GiB/s（大型卷） | 10.3 GiB/s |
| **最大 IOPS** | **450K** | 102K |
| **NFS** | NFSv3 + NFSv4.1 | NFSv4.1（仅 SSD 层） |
| **SMB** | 2.1, 3.0, 3.1.1 + CA | 2.1, 3.0, 3.1.1 + CA |
| **双协议** | ✅ | ❌ |
| **S3 API** | ✅ | ❌ |
| **最大卷** | 100 TiB ~ 7.2 PiB | 256 TiB |
| **冗余** | 本地 HA + CRR + CZR | LRS, ZRS, GRS, GZRS |
| **网络访问** | 仅 VNet | VNet + 公网 |
| **计费模式** | 预配置容量池 | 预配置或按量 |

### 选 ANF 的信号（Slide: When to Choose ANF）

✅ 亚毫秒延迟是硬需求
✅ 需要 NFSv3 支持
✅ 需要双协议（NFS + SMB 同一数据）
✅ SAP HANA / Oracle / HPC / EDA / AI-ML workload
✅ 需要 450K+ IOPS 或多 GiB/s 吞吐
✅ 需要 ONTAP 企业级功能（克隆、应用一致性快照、CRR）

### 选 Azure Files 的信号（Slide: When to Choose Azure Files）

✅ 通用文件共享，成本优先
✅ 需要 GRS/GZRS 地理冗余
✅ 需要 Azure File Sync（本地缓存 + 云端存储）
✅ 需要公网访问的文件共享
✅ 简单的按量计费模型
✅ 纯 SMB 工作负载，延迟要求不极端

### 一句话总结（Slide: Summary）

> **ANF = 性能优先，Azure Files = 成本和简洁性优先。**
>
> 延迟敏感 → ANF。成本敏感 → Azure Files。双协议 → ANF，别无选择。

> 💡 过渡语：这就是今天的核心内容。下面进入 Q&A。

---

## Part 8: Q&A (10 min)

### 引导问题（Slide: Q&A）

如果大家一时没有问题，我准备了几个常见的讨论点：

1. **"客户已经在用 Azure Files，什么时候该建议迁移到 ANF？"**
   - 当他们抱怨延迟（>2ms 不可接受的场景）
   - 当他们需要 NFS + SMB 双协议
   - 当他们的 IOPS 需求超过 100K

2. **"ANF 的 minimum commitment 是什么？"**
   - 最小 capacity pool 1 TiB（Standard network features）
   - 按预配置容量计费，不管用了多少

3. **"ANF 能跨区域 VNet Peering 访问吗？"**
   - 可以，但需要 Standard network features
   - 注意延迟会增加

4. **"如果客户的 workload 需要 GRS 级别的冗余？"**
   - ANF 没有 GRS——需要用 CRR 手动复制到配对区域
   - 如果需要自动 failover + 地理冗余，Azure Files 可能更合适

### 结束语

感谢大家的时间。今天的材料我会分享给大家。

如果在客户 engagement 中遇到 ANF 相关的问题，随时找我讨论。

**Thank you!**

---

## 附录：关键数字速查表

| 资源 | 限制 |
|-----|-----|
| NetApp Account / 区域 | 100 |
| Capacity Pool / Account | 25 |
| Volume / Pool | 500 |
| 最小 Pool | 1 TiB |
| 最大 Pool | 2,048 TiB |
| 最小 Volume | 50 GiB |
| 最大 Volume（常规） | 100 TiB |
| 最大 Volume（大型） | 1 PiB (2 PiB breakthrough) |
| 最大文件 | 16 TiB |
| 快照 / 卷 | 255 |
| Standard 吞吐 / TiB | 16 MiB/s |
| Premium 吞吐 / TiB | 64 MiB/s |
| Ultra 吞吐 / TiB | 128 MiB/s |
