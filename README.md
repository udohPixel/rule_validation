# Rule Validation API
### A simple rule-validation API.
###### . 

## Tools
>+ __Server Side Framework:__ Node/Express
>+ __Version Control:__ Git
>+ __Linting Library:__ Eslint
>+ __Style Guide:__ Airbnb
>+ __Error Handling Library:__ Winston
>+ __Testing Framework:__ Mocha​ and Chai
>+ __Coverage:__ Istanbul NYC

## Links
### API Documentation
https://documenter.getpostman.com/view/25349712/2s8ZDbVfdx

### Hosted API
https://www.render.com/...

### Github Repo
https://github.com/udohPixel/rule_validation


## API Endpoints (See API Documentation for full API Endpoints with example code implementation)
``` js
GET     /                             fetch my information
POST    /validate-rule                rule validation
```

## Fields
| Field Name      | Field Type                             | Description                                                          |
| --------------- | -------------------------------------- | -------------------------------------------------------------------- |
| rule            | object                                 | Required. Contains the rules to be used for validation.              |
| field           | string                                 | Required. The field in the data passed to validate the rule against. |
| condition       | string                                 | Required. The condition to use for validating the rule.              |
| condition_value | object, array, string, number, boolean | Required. The condition value to run the rule against.               |
| data            | object, array, string                  | Required. The data field to validate the rule against.               |
