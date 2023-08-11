# ruby-copy-modulized README

This extension lets you copy the modulized version of a ruby class or module
from a typical definition.

For example, if you have a file like this

```
module Foo
  module Some::Thing
    class Bar
    end
  end
end
```

it would let you copy `Foo::Some::Thing::Bar` by selecting the first three lines
and executing the command. Selecting other lines produces according results.

## Features

Works for modules and classes, both in shortcut form as in full qualified.
Also respects classes within classes.

## Release Notes

### 0.0.1

Initial release
