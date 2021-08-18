const h1 = (props: any) => (
  <h1 className="text-3xl mt-14 mb-6 text-header font-bold" {...props} />
);

const h2 = (props: any) => (
  <h2 className="text-2xl mt-12 mb-5 text-header font-bold" {...props} />
);

const h3 = (props: any) => (
  <h3 className="text-xl mt-11 mb-4 text-header font-semibold" {...props} />
);

const h4 = (props: any) => (
  <h4 className="text-lg mt-10 mb-3 text-header font-semibold" {...props} />
);

const h5 = (props: any) => (
  <h5 className="text-md mt-8 mb-2 text-header font-medium" {...props} />
);

const h6 = (props: any) => (
  <h6 className="text-sm mt-6 mb-1 text-header font-medium" {...props} />
);

const p = (props: any) => <p className="my-4" {...props} />;

const mdx = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
};

export default mdx;
