# fx-r3f-congrats

React SPA w/ 3D scene displaying congratulations to the user regarding the arrival of a new baby.

The scene is implemented in webGL using react-three-fiber. It features a metallic-looking baby break-dancing in front of 3D text, with the lot encircled by a flock of flying storks.

The original version of this project was made for a colleague and featured a 3D flying version of his company's brand marque. I decided to replace the logo with a flying stork and release the code.

There were some minor texture issues with the dancing baby so I opted to use a matcap texture instead for a metallic look.

This project was initially inspired by - and borrows from - the following codesandbox posted by @drcmda (<https://twitter.com/0xca0a>), a well-known contributor to the threejs/react-three-fiber ecosystem:

<https://codesandbox.io/embed/react-three-fiber-gltf-loader-animations-c671i?codemirror=1>

The models are from Sketchfab and the baby was animated using the stock animations from [Mixamo](https://mixamo.com).

The scene has physics courtesy of `@react-three/cannon` so you can add some falling confetti...

## Importing Models

If you would like to fork this project and customize the scene with additional models, you can download many free 3D models from sites like <https://sketchfab.com>.

Choose the GLTF format as it is best-suited for webGL.

After you unzip a model file, compile it to a compressed GLB version for performance using a tool like `gltf-pipeline`:

```sh
npx gltf-pipeline -i scene.gltf -o model.glb --draco.compressionLevel=10
```

Then use `gltfjsx` to generate a boilerplate React component. The `--types` flag generates TypeScript/TSX and the newer `--transform` flag will produce a compressed, texture-resized, deduped, and pruned asset: 

```sh
npx gltfjsx model-baby.glb --types --transform
```

The generated component isn't always perfect so you may need to customize the TypeScript and add a `@ts-ignore` or `@ts-expect-error` here and there.

## Development

Start dev mode (configured to run at http://localhost:3045):

```sh
yarn start
```

## Build

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). As such, remember to consider the `homepage` property in `package.json` before you run the build script. Is currently set to `'.'`.

To produce a build (outputs to build/ folder):

```sh
yarn build
```

Refer to [Create React App docs](https://facebook.github.io/create-react-app/docs/getting-started) and [React docs](https://reactjs.org/) for more details.

## License

Code is released under MIT license.

The dancing baby and flying stork models distributed in this repo are NOT covered under the scope of this license. They were downloaded from Sketchfab and are subject to the CC Attribution license.

The dancing baby model was inspired by the OG dancing baby meme. It was created by Sketchfab user [Punkinob](https://sketchfab.com/Punkinob) and is available for download here: <https://sketchfab.com/3d-models/dancing-baby-model-v2-f78e6c976e8847f0a574c69d3d0ed256>.

The flying stork model was created by Sketchfab user [chernyi.r](https://sketchfab.com/chernyi.r) and is available for download here: <https://sketchfab.com/3d-models/stork-224ec84e92424611a1ba9178b663be0b>.

