interface IProps {
    message: string;
    success: boolean;
}

const Notification = ({ message, success }: IProps) => {
  if (!message) return null;

  return (
    <div className={success ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default Notification;