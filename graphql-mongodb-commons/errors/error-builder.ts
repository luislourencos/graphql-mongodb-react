
 export const buildError =(name:string) =>{
        return class extends Error {
            constructor(message:string) {
                super(message)
            }
    
            get name() { return name }
        }
    
}
