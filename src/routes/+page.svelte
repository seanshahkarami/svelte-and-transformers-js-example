<script>
    import { pipeline, Pipeline } from "@xenova/transformers";

    /** @type {FileList?} */
    let files;

    function readImage(file) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = reject;

            const reader = new FileReader();
            reader.onload = () => {
                image.src = reader.result;
            };
            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    }

    /** @type {Pipeline?} */
    let pipe = null;

    async function classifyImage(file) {
        console.log("classifyImage", file.name);

        if (!pipe) {
            console.log("loading model");
            pipe = await pipeline("object-detection");
        }

        console.log("loading image data");
        const image = await readImage(file);

        console.log("performing analysis");
        const detections = await pipe(image.src);

        console.log("done!", image, detections);
        return { image, detections };
    }
</script>

<h1>Svelte + Transformers.js Example</h1>

<div>
    <input type="file" accept="image/png, image/jpeg" bind:files />
</div>

<div>
    {#if files && files.length > 0}
        {#await classifyImage(files[0])}
            <h3>Processing image...</h3>
        {:then result}
            <svg
                width="1280"
                viewBox="0 0 {result.image.width} {result.image.height}"
                xmlns="http://www.w3.org/2000/svg"
            >
                <image
                    href={result.image.src}
                    width={result.image.width}
                    height={result.image.height}
                />

                {#each result.detections as d}
                    <rect
                        x={d.box.xmin}
                        y={d.box.ymin}
                        width={d.box.xmax - d.box.xmin}
                        height={d.box.ymax - d.box.ymin}
                        stroke="black"
                        stroke-width="2pt"
                        fill="none"
                    />
                    <rect
                        x={d.box.xmin}
                        y={d.box.ymin - 24}
                        width={d.box.xmax - d.box.xmin}
                        height="24"
                        stroke="black"
                        stroke-width="2pt"
                        fill="black"
                    />
                    <text
                        x={d.box.xmin}
                        y={d.box.ymin}
                        style="font: bold 30px sans-serif;"
                        fill="white">{d.label} - {d.score}</text
                    >
                {/each}
            </svg>
        {:catch error}
            <h3>Failed with error: {error}</h3>
        {/await}
    {/if}
</div>
