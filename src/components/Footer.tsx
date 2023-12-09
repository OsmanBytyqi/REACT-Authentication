export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8" style={{  position: 'relative' , backgroundColor:'#1565c0'}}>
            <div className="container mx-auto h-full flex items-center">
                <p className="text-center" style={{ position: 'absolute', left:'40%'}}>
                    &copy; 2023 Tech Innovators. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}