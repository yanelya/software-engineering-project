const isFieldEmpty = (fieldObject) => {
    return !Object.values(fieldObject).every(value => value.length > 0)
}

export default isFieldEmpty;