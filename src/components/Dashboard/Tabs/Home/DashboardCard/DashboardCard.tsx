import { TPost } from '@/types/types';

export default function DashboardCard({
  postData,
  id,
}: {
  postData: TPost['attributes'];
  id: number;
}) {
  // Retrieve or generate color scheme
  const colorScheme = localStorage.getItem('dashboardCardColors');

  if (!colorScheme) {
    const colorSchemeObj = {
      0: {
        primaryColor: '#97DE9F',
        secondaryColor: 'rgb(85, 138, 91)',
        borderColor: 'rgb(146, 209, 153)',
      },
      1: {
        primaryColor: '#DEC697',
        secondaryColor: 'rgb(172, 145, 95)',
        borderColor: 'rgb(216, 188, 136)',
      },
      2: {
        primaryColor: '#97D7DE',
        secondaryColor: 'rgb(119, 180, 187)',
        borderColor: 'rgb(135, 201, 208)',
      },
      3: {
        primaryColor: '#D9D5D1',
        secondaryColor: 'rgb(166, 162, 158)',
        borderColor: 'rgb(204, 199, 195)',
      },
      4: {
        primaryColor: '#AFACE4',
        secondaryColor: 'rgb(106, 103, 177)',
        borderColor: 'rgb(164, 161, 215)',
      },
    };
    localStorage.setItem('dashboardCardColors', JSON.stringify(colorSchemeObj));
  }

  const storedColors = JSON.parse(localStorage.getItem('dashboardCardColors')!);
  const { primaryColor, secondaryColor, borderColor } = storedColors[id];

  const calculatedDate =
    Math.floor(Date.now() - Date.parse(postData.createdAt)) /
    1000 /
    60 /
    60 /
    24;

  return (
    <div
      className="flex flex-col gap-1 rounded-3xl p-2 xl:p-4"
      style={{
        backgroundColor: primaryColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <a
        href={`/dashboard/posts/${postData.slug}`}
        className="text-black font-bold"
      >
        {postData.title.charAt(0).toUpperCase() + postData.title.slice(1)}
      </a>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center md:gap-1 xl:gap-2 text-sm">
          <p style={{ color: secondaryColor }}>by {postData.author}</p>
          <p style={{ color: secondaryColor }}>•</p>
          <p
            className="md:px-1 2xl:px-3 rounded-full"
            style={{ backgroundColor: secondaryColor, color: primaryColor }}
          >
            {postData.tag}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p
            className="px-6 py-1 text-white font-bold text-lg rounded-xl w-fit h-fit"
            style={{ backgroundColor: secondaryColor }}
          >
            {postData.views || 0}
          </p>
          <div className="flex flex-col">
            <p className="text-black font-bold">Views</p>
            <p className="text-sm" style={{ color: secondaryColor }}>
              in {Math.floor(calculatedDate)} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
