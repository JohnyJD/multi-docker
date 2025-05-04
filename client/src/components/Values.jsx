function Values({
    values
}) {
    return (
        <div>
            <h3>Calculated values:</h3>
            <p>
            { (values && values.length > 0) && values.map(value => {
                return <>{value.number}, </>
            })}
            </p>
        </div>
    );
}

export default Values;