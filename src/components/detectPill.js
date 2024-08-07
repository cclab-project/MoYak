export const detectPill = (imageElement) => {
    return new Promise((resolve) => {
        const cv = window.cv;

        const src = cv.imread(imageElement);
        const gray = new cv.Mat();
        const blurred = new cv.Mat();
        const sharp = new cv.Mat();
        const edges = new cv.Mat();
        const thresh = new cv.Mat();
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
        cv.bilateralFilter(gray, blurred, 9, 75, 75);

        const kernel = cv.matFromArray(3, 3, cv.CV_32F, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
        cv.filter2D(blurred, sharp, cv.CV_8U, kernel);

        cv.Canny(sharp, edges, 50, 100);
        cv.threshold(edges, thresh, 150, 255, cv.THRESH_TOZERO);
        cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        let foundPill = false;
        for (let i = 0; i < contours.size(); i++) {
            const contour = contours.get(i);
            const area = cv.contourArea(contour);
            const rect = cv.boundingRect(contour);
            const aspectRatio = rect.width / rect.height;

            if (area > 500 && aspectRatio > 0.5 && aspectRatio < 2) {
                const color = new cv.Scalar(0, 255, 0);
                cv.rectangle(src, new cv.Point(rect.x, rect.y), new cv.Point(rect.x + rect.width, rect.y + rect.height), color, 2);
                foundPill = true;
            }
        }

        src.delete();
        gray.delete();
        blurred.delete();
        sharp.delete();
        edges.delete();
        thresh.delete();
        contours.delete();
        hierarchy.delete();

        resolve(foundPill);
    });
};
