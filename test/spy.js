const createSpy = () => {
  const callLog = [];

  const spyFn = (...args) => {
    callLog.push(args);
  }

  spyFn.isCalledOnce = (...expectedArgs) => {
    if(callLog.length !== 1) return false;
    return expectedArgs.every((arg, index) => arg === callLog[0][index]);
  }

  spyFn.isNotCalled = () => callLog.length === 0;

  return spyFn;
}

exports.createSpy = createSpy;