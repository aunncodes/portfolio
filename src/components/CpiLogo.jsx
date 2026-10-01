export default function CpiLogo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path fill="#6600af" d="M50,5A45,45,0,1,1,5,50,45.05,45.05,0,0,1,50,5m0-5a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z" />
      <line stroke="#be5eff" strokeWidth="7" x1="50" y1="27" x2="73.29" y2="65.64" />
      <line stroke="#be5eff" strokeWidth="7" x1="50" y1="27" x2="26.71" y2="67" />
      <circle fill="#961be8" cx="50" cy="27" r="10" />
      <circle fill="#961be8" cx="26.71" cy="67" r="10" />
      <circle fill="#961be8" cx="73.29" cy="67" r="10" />
    </svg>
  )
}
