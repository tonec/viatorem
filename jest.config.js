module.exports = {
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  modulePaths: ['src'],
  collectCoverage: true,
  coverageFormats: ['json', 'html']
}
