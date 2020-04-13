module.exports = {
  name: 'client-ng',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/client-ng',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
