const newFormData = (data: any) => {
    const blob = new Blob([data], {type: 'text/plain'});
    const url = URL.createObjectURL(blob)

    const formData = new FormData();
    formData.append('content', blob, url);

    return formData
}

export {newFormData}