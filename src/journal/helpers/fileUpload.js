export const fileUpload = async(file) =>{
    if (!file) throw new Error('No se obtuvo ningún archivo')
    const cloudUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`
    const formData = new FormData()
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_CLOUD_PRESET)
    formData.append('file',file)
    try {
        const res = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        })
        if (!res.ok) throw new Error('No se subieron las imagenes')
        const {secure_url} = await res.json()
        return secure_url
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}