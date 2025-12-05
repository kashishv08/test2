"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Images = {
  url: string;
  ready: boolean;
  error: boolean;
};

type DataType = {
  name: string;
  count: number;
  images: Images[];
  address: string;
};

function HomePage() {
  const [data, setData] = useState<DataType>();
  const [load, setLoad] = useState(false);
  const [tryy, setTryy] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const d = await fetch("/api/images");
        const val = await d.json();
        setData(val.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  const error = data?.images?.some((img) => img.error);

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoad(true);
    }
  }, [error]);

  useEffect(() => {
    if (tryy > 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoad(false);
    } else {
      const timer = setTimeout(() => setTryy((prev) => prev + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tryy]);

  return (
    <div className="w-full sm:max-w-lg mx-auto bg-gray-950 shadow-lg border border-gray-200 mt-5">
      <div className="flex items-center p-4 space-x-4">
        <div className="flex flex-col -space-y-2">
          <div className="flex -space-x-2">
            {data?.images?.slice(0, 2).map((img, index) => (
              <div
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300"
                key={index}
              >
                {img.ready && !img.error ? (
                  <Image
                    src={img.url}
                    alt="File icon"
                    width={38}
                    height={38}
                    title={`Status: Ready | Count: ${tryy}`}
                    className="w-full h-full object-cover"
                  />
                ) : load ? (
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  <Image
                    src="/error.png"
                    alt="File icon"
                    width={38}
                    height={38}
                    className="w-full h-full object-cover"
                    title={`Status: Failed | Count: ${tryy}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex -space-x-2">
            {data?.images?.slice(2, 4).map((img, index) => (
              <div
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300"
                key={index}
              >
                {img.ready && !img.error ? (
                  <Image
                    src={img.url}
                    alt="File icon"
                    width={38}
                    height={38}
                    className="w-full h-full object-cover"
                    title={`Status: Ready | Count: ${tryy}`}
                  />
                ) : load ? (
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  <Image
                    src="/error.png"
                    alt="File icon"
                    width={38}
                    height={38}
                    className="w-full h-full object-cover"
                    title={`Status: Failed | Count: ${tryy}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">
            {data?.name} {data?.count}
          </h2>
          <p className="text-sm text-white">{data?.address}</p>
        </div>

        {!load && error ? (
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full border border-red-300">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
              <Image
                src="/error.png"
                alt="File icon"
                width={38}
                height={38}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
