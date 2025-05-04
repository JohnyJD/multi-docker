function Indexes({
    indexes
}) {
    return (
        <div>
            <h3>Indexes I have seen:</h3>
            {
                Object.entries(indexes).map(index => {
                    return <p key={index[0]}>For index {index[0]} was calulated {index[1]}</p>
                })
            }
        </div>
    );
};

export default Indexes;