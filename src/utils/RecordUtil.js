function getValue(record, property) {
  if (record) {
    if (Object.prototype.hasOwnProperty.call(record, property)) {
      return record[property]
    } else {
      return record
    }
  }

  return null
}

export default {
  getRecordValue(record, valueProperty) {
    if (!valueProperty) {
      valueProperty = 'id'
    }

    return getValue(record, valueProperty)
  },
  getRecordDisplayName(record, displayProperty) {
    if (!displayProperty) {
      displayProperty = 'name'
    }

    return getValue(record, displayProperty)
  }
}
