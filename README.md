# 🔎 mm2-item-info

A CLI tool for Murder Mystery 2 (MM2) that returns information about a weapon, pet, or misc item.

## Installation

> 🚧 Coming soon.

## Usage

### Default

```bash
mm2-item-info
```

Shows basic information about the tool and how to use it. Run `mm2-item-info -h` / `mm2-item-info --help` for additional information.

> **Note:** The free tier is limited to **30 requests/min**

### Options

#### Get Item Info

Get information about a specific item (value, demand, type, etc):

```bash
mm2-item-info -i <item-name>
# or
mm2-item-info --info <item-name>
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

#### List Item Types

List all supported item types:

```bash
mm2-item-info --lit
# or
mm2-item-info --list-item-types
```

#### List Rarities

List all supported item rarities:

```bash
mm2-item-info --lr
# or
mm2-item-info --list-rarities
```

#### Show Config

Display your current configuration settings (contains API key):

```bash
mm2-item-info --sc
# or
mm2-item-info --show-config
```

## Credits

All data is provided by [RBLXValue](https://docs.rblxvalue.com/getting-started).
