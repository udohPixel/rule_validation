// rule evaluator
const ruleEvaluator = {
  // rule evaluator function
  evaluateRule: (condition, fieldValue, conditionValue) => {
    switch (condition) {
      case 'eq': return (fieldValue === conditionValue);
      case 'neq': return (fieldValue !== conditionValue);
      case 'gt': return fieldValue > conditionValue;
      case 'gte': return fieldValue >= conditionValue;
      case 'contains': return fieldValue.includes(conditionValue);
      default: return false;
    }
  },
};

// export
module.exports = ruleEvaluator;
