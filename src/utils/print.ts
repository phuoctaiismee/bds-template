export const printHTML = (html: string) =>
  new Promise<void>((resolve, reject) => {
    const newWindow = window.open('', '_blank');

    if (!newWindow) {
      return reject("Can't open window");
    }

    newWindow.document.writeln(html);
    newWindow.document.close();

    newWindow.addEventListener('afterprint', () => {
      resolve();

      setTimeout(() => {
        newWindow.close();
      }, 1000);
    });

    newWindow.print();
  });
