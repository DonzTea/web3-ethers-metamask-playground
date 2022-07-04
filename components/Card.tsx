import React from 'react';

interface Props {
  children: any;
  title?: string | undefined;
}

export default function Card({ children, title }: Props) {
  return (
    <section
      className={`w-full p-6 bg-white rounded-md shadow-md dark:bg-gray-800`}
    >
      {title && (
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
