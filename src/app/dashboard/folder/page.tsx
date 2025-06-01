"use client"

import { use, useEffect } from "react";

export default function FolderToMainPage() {
    useEffect(() => {
        window.location.href = "/dashboard";
    }, []);
    return (<></>);
}
