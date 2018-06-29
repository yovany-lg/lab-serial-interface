function receiveData(data) {
  if (this.frameBegin && data.includes('\x03')) {
    const newData = data.split('\x03');
    const frame = this.dataFrame.concat(newData[0],'\x03');
    this.dataFrame = newData[1];
    this.frameBegin = false;
    return frame;
  }
  this.dataFrame = this.dataFrame.concat(data);

  if (!this.frameBegin) {
    const idx1 = this.dataFrame.indexOf('\x02D1U');
    const idx2 = this.dataFrame.indexOf('\x02D2U');
    this.frameBegin = idx1 !== -1 || idx2 !== -1;
    if(this.frameBegin) {
      this.dataFrame = idx1 !== -1 ? this.dataFrame.substring(idx1) : this.dataFrame;
      this.dataFrame = idx2 !== -1 ? this.dataFrame.substring(idx2) : this.dataFrame;
    } else {
      this.dataFrame = '';
    }
  }
  return false;
}

function buildFrame(data) {
  const frame = this.receiveData(data);
  if (frame) {
    const frameName = frame.includes('\x02D1U') ? 'format1' : 'format2';
    this[frameName] = frame;
    if (this.format1 && this.format2) {
      const fullFrame = {
        format1: this.format1,
        format2: this.format2,
      }
      this.format1 = '';
      this.format2 = '';
      return fullFrame;
    }
  }
  return false;
}

const init = () => {
  return Object.create({
    frameBegin: false,
    dataFrame: '',
    format1: '',
    format2: '',
    receiveData,
    buildFrame,
  });
}

module.exports = init;
