import { Component } from "@angular/core";
import { ImageSource } from "tns-core-modules";
import * as imagepicker from "nativescript-imagepicker";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {

    public async selectPicture(): Promise<ImageSource> {
        let newPicture: ImageSource;
        const context = imagepicker.create({
            mode: "multiple"
        });

        await context.authorize().then(
            async () => {
            await context.present().then(
                (selection) => {
                selection.forEach(async (imageAsset) => {
                    const image = new ImageSource();
                    await image.fromAsset(imageAsset).then(source => {
                    newPicture = source;
                    });
                });
                }
            );
            },
            () =>
                console.log("error")
        );

    return newPicture;
  }
}
