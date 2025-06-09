
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
        content: "Welcome! This quick tutorial will guide you to through dashboard's options.",
        disableBeacon: true
    }, {
        target: ".search-zone",
        content: "This is search zone, where you can search and easily get the image with image name.",
    }, {
        target: ".list-grid",
        content: "This provides you option to change view as per the need, you can opt for list view or grid view in one click.",
    }, {
        target: ".collection",
        content: "This is where the collection of all the uploaded images could be viewed.",
    }, {
        target: ".collection-item",
        content: "Click on any such item to view its details, copy the links.",
    }, {
        target: ".favorite",
        content: "Click on this to mark the image as favorite, so you can easily find it later.",
    }, {
        target: ".delete",
        content: "Click on this to delete the image from your collection.",
    }
];