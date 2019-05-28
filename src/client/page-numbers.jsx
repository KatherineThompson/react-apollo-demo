import React from "react";
import fill from "lodash/fill";

const PageNumbers = ({ pagination, onSwitchPage }) => {
    if (!pagination) {
        return null;
    }
    const numbers = fill(new Array(pagination.numPages)).map((_, index) => (
        <span
            key={index}
            className={pagination.pageNum === index + 1 ? "page-number--active" : ""}
            onClick={() => onSwitchPage(index + 1)}
        >
            {index + 1}
        </span>
    ));
    return (
        <div className="page-numbers">
            {numbers}
        </div>
    );
};

export default PageNumbers;
