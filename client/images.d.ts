declare module "*.png" {
    const value: string;  // The imported PNG will be treated as a string (path to the file)
    export default value;
}