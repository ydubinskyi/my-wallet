module.exports = {
  name: 'client-ng',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/client-ng',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
