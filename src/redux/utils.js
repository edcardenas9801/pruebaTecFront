export const stringArrayToObject = (array, namespace = '') => {
    if (array.some(item => !item || typeof item !== 'string')) {
        throw new Error('Action names must be strings and must not be empty');
    }
    return array.reduce(
        (acum, item) => ({ ...acum, [item]: `${namespace}:${item}` }),
        {}
    );
};
export default { stringArrayToObject };