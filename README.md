# kad-tools

Kad2.0 前端 VSCode 插件，暂时可将 `px` 或 `rpx` 转 `rem` ，或将 `rem` 转 `px` 或 `rpx`

![](screenshots/px2rem.gif)

# 如何安装

```
扩展 > 更多操作... > 从VSIX安装...
```

# 如何使用

- 在文件内自动转换，例如录入 `12px` 智能提醒对应转化后 `rem` 值
- 通过 `F1` 面板查找：`kad-tools`

# 支持语言

html vue css less scss sass stylus tpl（php smarty3）

# 配置

点击 VS Code 的 `文件 > 首选项 > 设置`，打开设置面板：

| 名称                          | 描述                                                                                                       | 默认值 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| `kad-tools.rootFontSize`         | 基准 font-size（单位：`px`）                                                                               | `100`   |
| `kad-tools.fixedDigits`          | `px` 转 `rem` 小数点最大长度                                                                               | `6`    |
| `kad-tools.autoRemovePrefixZero` | 自动移除 0 开头的前缀                                                                                      | `false` |
| `kad-tools.ingoresViaCommand`    | 当使用命令行批量转换时，允许忽略部分 `px` 值不转换成 `rem`（单位：`string[]`），例如：`[ "1px", "0.5px" ]` | `[]`   |

**注意：** 需要重新启动 VSCode 才会生效
