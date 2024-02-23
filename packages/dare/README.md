# dare

The datasets-and-resources library provides a set of classes and functions to
help you describe your content.

In this context a `dataset` is a collection of `resources` (may be a database,
a file, a web service, etc.); a `resource` is a single piece of content
(may be a table, a file, a web service endpoint, etc.). The `resource` consists
of `fields` (columns, properties, etc.) and `records` (rows, instances, etc.).

The `Field` is an abstract class. You will create concrete classes based on
it or one of the other classed that implement some of the abstract methods.
In the end you will have something like this:

```typescript

export const datasets = [
    {
        id: 'auth',
        resources: [
            {
                id: 'users',
                fields: [
                    new StringField('username'),
                    new StringField('password'),
                    new StringField('email'),
                    new StringField('role'),
                    new StringField('status'),
                ],
            },
        ],
    },
    {
        id: 'inventory',
        resources: [
            {
                id: 'products',
                fields: [
                    new StringField('name'),
                    new StringField('description'),
                    new StringField('category'),
                    new NumberField('price'),
                    new NumberField('stock'),
                ],
            },
            {
                id: 'orders',
                fields: [
                    new StringField('customer'),
                    new StringField('product'),
                    new NumberField('quantity'),
                    new NumberField('price'),
                    new StringField('status'),
                ],
            },
        ],
    }
]
```


## Building

Run `nx build dare` to build the library.

## Running unit tests

Run `nx test dare` to execute the unit tests via [Jest](https://jestjs.io).
