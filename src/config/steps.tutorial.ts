
import { Step } from "react-joyride";


export const uploadSteps: Step[] = [
    {
        target: "body",
        placement: "center",
        content: "Welcome! This quick tutorial will guide you to upload an image.",
        disableBeacon: true
    }, {
        target: ".upload-zone",
        content: "Now go ahead and click it to choose your image file.",
    }, {
        target: ".uploading-file",
        content: "This section shows the file being uploaded.",
    }, {
        target: ".uploaded-file",
        content: "Click on this to get window to copy or view the image link.",
    }, {
        target: ".side-nav-dashboard",
        content: "You can visit your dashboard to view all your uploads anytime.",
    }
];



export const dashboardSteps: Step[] = [
    {
        target: "body",
        placement: "center",
        content: "Welcome! This quick tutorial will guide you to upload an image.",
        disableBeacon: true
    }, {
        target: ".upload-zone",
        content: "Now go ahead and click it to choose your image file.",
    }, {
        target: ".uploading-file",
        content: "This section shows the file being uploaded.",
    }, {
        target: ".uploaded-file",
        content: "Click on this to get window to copy or view the image link.",
    }, {
        target: ".side-nav-dashboard",
        content: "You can visit your dashboard to view all your uploads anytime.",
    }
];