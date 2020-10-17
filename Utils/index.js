import checkPropTypes from 'check-prop-types';

export const FindByTestAttr = (component, attr) => {
  const selector = component.find(`[data-test='${attr}']`);
  return selector;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  );
  return propsErr;
};
