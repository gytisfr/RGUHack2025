

export const Modal = (props) => {
    return (
        <div className="modal-background">
            <form className="modal-form">
                <header className="modal-header">
                    <h1>Enter Sighting</h1>
                    <button type="button" onClick={() => {props.setModalOpen(false)}}><img src="../src/assets/X.png"></img></button>
                </header>
            </form>
        </div>
    )
}