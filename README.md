# fx-r3f-congrats

React SPA that renders a 3D webGL scene presenting a message of congratulations to the user regarding the arrival of a new baby.

The scene is implemented using react-three-fiber. It features a metallic-looking baby break-dancing in front of 3D text, encircled by a flock of flying storks.

This project was originally created for a colleague and featured a 3D flying version of his company's brand marque instead of a stork. I decided to release the code so I replaced the company logo with an animated flying stork.

There were some minor texture issues with the dancing baby so I decided to use matcap textures instead for an metallic look that I think looks cooler than the original model's textures.

This project was initially inspired by - and borrows from - the following codesandbox posted by @drcmda (<https://twitter.com/0xca0a>), a well-known contributor to the threejs/react-three-fiber ecosystem:

<https://codesandbox.io/embed/react-three-fiber-gltf-loader-animations-c671i?codemirror=1>

The models are from Sketchfab and the baby was animated using the stock animations from [Mixamo](https://mixamo.com).

## Customizing this Project

### Importing Models

If you would like to fork this project and customize the scene with additional models, you can find free 3D models for download from sites like <https://sketchfab.com>, <https://free3d.com/>, <https://www.cgtrader.com/>, etc.

It's usually best to pick the GLTF format as it is best-suited for webGL. Sketchfab has a useful feature where you can download any model in GLTF format. Their platform converts models to a variety of formats and the quality of the conversion is usually pretty good.

After you download + unzip a given model file, compile it to a compressed GLB version that will deliver better performance using a tool like `gltf-pipeline`:

```sh
npx gltf-pipeline -i scene.gltf -o model.glb --draco.compressionLevel=10
```

Then use `gltfjsx` to generate a boilerplate React component. The `--types` flag generates TypeScript/TSX and the newer `--transform` flag will produce a compressed, texture-resized, deduped, and pruned asset: 

```sh
npx gltfjsx model-baby.glb --types --transform
```

The generated TS/TSX code isn't always perfect and various libraries in the react-three-fiber ecosystem do not have full TypeScript support yet so you may need to customize the code and add a `@ts-ignore`/`@ts-expect-error` here and there to get things working.

### Animating Models

The baby's animation is from [Adobe Mixamo](https://mixamo.com). At the time of writing, Mixamo supports FBX + OBJ vs. GLTF so you will need to source your models in this format first, use Mixamo, and then convert the output to GLTF/GLB using Blender.

If you are unfamiliar with this process, this blog post may help you: <https://www.donmccurdy.com/2017/11/06/creating-animated-gltf-characters-with-mixamo-and-blender/>

## Development

Start dev mode (configured to run at http://localhost:3045):

```sh
yarn start
```

## Build

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (CRA).

Per CRA, remember to consider the `homepage` property in `package.json` before you run the build script. This setting can impact if the components under `src/components/models` can load the `*.glb` files under `public/` (you can also refer to the filename/paths used by the components). The `homepage` property value is `'.'`.

To produce a build + output to the `build/` folder, run:

```sh
yarn build
```

Refer to the [CRA docs](https://facebook.github.io/create-react-app/docs/getting-started) and [React docs](https://reactjs.org/) for more details.

## License

Code is released under MIT license.

The files under the `public/` folder, including the 3D models distributed as `*.glb` files and the font data per `font.blob`, are NOT covered under the scope of this license.

The `flying-stork.glb` and `dancing-baby.glb` assets were downloaded from Sketchfab and are subject to the CC Attribution license.

The dancing baby model was inspired by the original dancing baby meme. It was created by Sketchfab user [Punkinob](https://sketchfab.com/Punkinob) and is available for download here: <https://sketchfab.com/3d-models/dancing-baby-model-v2-f78e6c976e8847f0a574c69d3d0ed256>.

The flying stork model was created by Sketchfab user [chernyi.r](https://sketchfab.com/chernyi.r) and is available for download here: <https://sketchfab.com/3d-models/stork-224ec84e92424611a1ba9178b663be0b>.

