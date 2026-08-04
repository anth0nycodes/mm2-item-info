# 🔎 mm2-item-info

A CLI tool for Murder Mystery 2 (MM2) that returns information about a weapon, pet, or misc item.

![demo](./assets/demo.gif)

<p align="center">
  <img alt="GitHub Stars" src="https://img.shields.io/github/stars/anth0nycodes/mm2-item-info?style=plastic">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/%40anth0nycodes%2Fmm2-item-info?style=plastic">
</p>

## Installation

```bash
npm install -g @anth0nycodes/mm2-item-info
```

## Usage

### Default

```bash
mm2-item-info
```

Shows basic information about the tool and how to use it. Run `mm2-item-info -h` / `mm2-item-info --help` for additional information.

> [!NOTE]
> The free tier is limited to **30 requests/min**

### Options

#### Get Item Info

Get information about a specific item (value, demand, type, etc):

```bash
mm2-item-info -i <item-name>
# or
mm2-item-info --info <item-name>
```

> [!NOTE]
> Multi-word item names must be wrapped in quotes (e.g. `mm2-item-info -i "Elderwood Scythe"`).

#### List Item Categories

List all supported item categories:

```bash
mm2-item-info --lic
# or
mm2-item-info --list-item-categories
```

#### List Rarities

List all supported item rarities:

```bash
mm2-item-info --lr
# or
mm2-item-info --list-rarities
```

#### API Key Info

Show instructions on how to create an API key:

```bash
mm2-item-info --aki
# or
mm2-item-info --api-key-info
```

#### Set API Key

Set your API key:

```bash
mm2-item-info --sak <api-key>
# or
mm2-item-info --set-api-key <api-key>
```

#### Show Config

Display your current configuration settings (contains API key):

```bash
mm2-item-info --sc
# or
mm2-item-info --show-config
```

#### Reset Config

Resets your current configuration settings (clears API key):

```bash
mm2-item-info --rc
# or
mm2-item-info --reset-config
```

## Contributing

Contributions are welcome! Whether it's a bug fix, new feature, or docs improvement, see [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get started.

Found a bug? [Open a bug report](https://github.com/anth0nycodes/mm2-item-info/issues/new?template=bug_report.md).

## Credits

All data is provided by [RBLXValue](https://docs.rblxvalue.com/getting-started).
