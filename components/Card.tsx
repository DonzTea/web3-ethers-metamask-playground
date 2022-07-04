import React from 'react';

interface Props {
  children: any;
  title?: string | undefined;
}

export default function Card({ children, title }: Props) {
  return (
    <section className={`w-full p-6 bg-white rounded-md shadow-md`}>
      {title && (
        <h2 className="text-lg font-semibold text-gray-700 capitalize mb-4">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
