import Header from "./header/Header"
import Footer from "./Footer"
import useFetchData from "../hooks/useFetchData";
import Skeleton from '@material-ui/lab/Skeleton';
import { BlogItem } from "../types/AppTypes"
import BlogList from "./BlogList";

export default function Home() {
    const { data, loading } = useFetchData<BlogItem[]>('http://localhost:3000/blogs');
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div className="container mx-auto p-4">
                {loading ? (
                    <section className="my-8">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: '#1565c0' }}>
                            <Skeleton variant="text" width={200} />
                        </h2>
                        <hr className="my-6 border-t-2 border-gray-300" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">
                                        <Skeleton variant="text" width={100} />
                                    </h3>
                                    <p className="text-gray-600">
                                        <Skeleton variant="text" />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <section className="my-8">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: '#1565c0' }}>
                            Blogs
                        </h2>
                        <p className="text-gray-700"></p>
                        <hr className="my-6 border-t-2 border-gray-300" />
                        <BlogList data={data} />
                    </section>
                )}
            </div>
            <Footer />
        </div>
    );
}