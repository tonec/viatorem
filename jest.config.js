module.exports = {
  setupFiles: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  modulePaths: ['src'],
  collectCoverage: true,
  coverageFormats: ['json', 'html'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
}
