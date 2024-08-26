import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <div className="flex flex-wrap justify-between items-center">
            <div>
                {/* <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
          {items[items.length - 1].label}
        </h1> */}
                <ol className="list-reset flex text-sm">
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <li><span className="text-gray-5 mx-2">/</span></li>}
                            <li>
                                {item.href ? (
                                    <Link
                                        to={item.href}
                                        className={`text-gray-5 ${index === items.length - 1 ? 'text-blue-600' : 'hover:text-blue-600'}`}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={index === items.length - 1 ? 'text-blue-600' : 'text-gray-5'}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        </React.Fragment>
                    ))}
                </ol>
            </div>
        </div>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Breadcrumb;
