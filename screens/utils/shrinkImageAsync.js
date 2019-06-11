import * as ImageManipulator from 'expo-image-manipulator';
function reduceImageAsync(uri) {
  console.log('양호');
  return ImageManipulator.manipulateAsync(uri, [{ resize: { width: 500 } }], {
    compress: 0.5,
  });
}
export default reduceImageAsync;
