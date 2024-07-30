export class ClickableComponent {
  constructor({
    container,
    onClick,
    scene,
  }: {
    container: Phaser.GameObjects.Container;
    onClick: () => void;
    scene: Phaser.Scene;
  }) {
    console.log({
      containerWidth: container.width,
      displayWidth: container.displayWidth,
    });
    container
      .setInteractive({
        cursor: "pointer",

        hitArea: new Phaser.Geom.Rectangle(
          0,
          0,
          container.width,
          container.height,
        ),
        hitAreaCallback: (hitArea, x, y) => hitArea.contains(x, y),
      })
      .on("pointerdown", (p: Phaser.Input.Pointer) => {
        onClick();
      });

    scene.input.enableDebug(container);
  }
}
