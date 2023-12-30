
2. Import the sweep module into your code:

```javascript
const sweep = require('sweep.ai');
```

3. Set up your sweep.ai API key:

```javascript
sweep.setApiKey('YOUR_API_KEY');
```

4. Use the sweep.ai functions in your code:

```javascript
// Example usage
const result = sweep.analyzeText('This is a sample text');
console.log(result);
```

# Configurable Options with sweep

sweep.ai provides several configurable options to customize its behavior. Here are some examples:

1. Setting default values:

```javascript
sweep.setDefaultLanguage('en');
sweep.setDefaultThreshold(0.5);
```

2. Modifying specific features:

```javascript
sweep.enableSentimentAnalysis();
sweep.disableProfanityFilter();
