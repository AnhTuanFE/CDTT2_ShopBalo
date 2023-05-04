import './style.css';

function ConfirmModal({ Title, Body, HandleSubmit, setFalseCancel }) {
    const handleHiden = () => {
        setFalseCancel();
    };
    return (
        <div>
            <div class="modal1" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{Title}</h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal1"
                                aria-label="Close"
                                onClick={handleHiden}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>{Body}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={HandleSubmit}>
                                Đồng ý
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal1" onClick={handleHiden}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ConfirmModal;
