import { IonCol, IonGrid, IonImg, IonItem, IonRow, isPlatform } from "@ionic/react";

export const longSectionItems = [
  {
    header: "Bridging Disability Support Across Continents",
    title: "Connecting Diaspora Initiatives With African Disability Communities",
    detail:
      "ADDCR strengthens collaboration between disability-focused diaspora organizations and grassroots disability communities across Africa. We streamline project planning, accountability frameworks, needs assessments, and culturally relevant implementation models. Our aim is to ensure that international support—whether technical assistance, funding, rehabilitation programs, advocacy training, or community outreach—reaches persons with disabilities equitably and reflects their real social, economic, and cultural realities. ADDCR guarantees that partnerships are transparent, measurable, sustainable, and directed towards those who need support the most.",
      image: "/images/sidebars/side-bar-2.webp",
  
  },
  {
    header: "Driving Innovation for Inclusion",
    title: "Developing Accessible & Inclusive Solutions",
    detail:
      "We research, design, and deploy disability-inclusive innovations rooted in Africa’s diverse local contexts. These include accessible educational tools, assistive mobility devices created with locally sourced materials, inclusive software interfaces, digital empowerment programs, physical accessibility designs, and alternative communication systems for the hearing, visual, and neurodiverse communities. ADDCR promotes technology development, entrepreneurship incubation, and creative local solutions, ensuring that persons with disabilities are not just recipients of aid, but creators, innovators, and decision-makers driving change.",
      image: "/images/sidebars/side-bar-4.png",
  
  },
  {
    header: "Empowering Rights, Representation & Impact",
    title: "Advocacy, Legal Support & Inclusive Partnerships",
    detail:
      "ADDCR strengthens disability leadership and protection systems by bridging global disability legal expertise with grassroots African advocacy movements. We facilitate strategic litigation support, legal representation for discrimination cases, policy formation, disability rights awareness, and government partnership development. We provide advocacy training, leadership mentorship for disability activists, and collaboration between legal professionals in the diaspora and national human rights institutions. Our mission is to ensure that persons with disabilities achieve equitable representation, protection under the law, and a voice that shapes policy, governance, and community development from local levels to international spaces.",
     image: "/images/sidebars/side-bar-1.jpg",
  
  }
];

const sectionItems = [
    {
      header: "Bridging Disability Support Across Continents",
      title:
        "Connecting Diaspora Initiatives With African Disability Communities",
      detail:
        "ADDCR serves as a trusted link between organizations in the diaspora and African disability groups, ensuring that funding, programs, education, and technical support reach persons with disabilities through inclusive, transparent, and community-driven channels.",
      image: "/images/sidebars/side-bar-2.webp",
    },
    {
      header: "Driving Innovation for Inclusion",
      title: "Developing Accessible & Inclusive Solutions",
      detail:
        "We design and promote innovative tools, technologies, and programs tailored to the realities of Africans with disabilities. From assistive devices to digital accessibility and community inclusion models, ADDCR champions practical solutions that empower people with disabilities.",
      image: "/images/sidebars/side-bar-4.png",
    },
    {
      header: "Empowering Rights, Representation & Impact",
      title: "Advocacy, Legal Support & Inclusive Partnerships",
      detail:
        "ADDCR strengthens disability advocacy, legal representation, and inclusive policies by fostering collaboration between global disability advocates, African institutions, and diaspora groups. We amplify voices, protect rights, and scale impactful disability-centered projects.",
      image: "/images/sidebars/side-bar-1.jpg",
    },
  ];

export const MidSection = () => {
  

  return (
    <section id="features" className="home-sections">
       <IonGrid>
      {sectionItems.map((item, index) => (
        <IonRow key={index}>
          {
            isPlatform("desktop") ? (
              <>
              {index % 2 === 1 && (
            <>
              <IonCol size="12" sizeSm="6" className="ion-padding">
                <p className="large-text">{item.title}</p>
                <p>{item.detail}</p>
              </IonCol>
              
              <IonCol sizeSm="5" size="12">
                <IonItem>
                  <IonImg src={item.image} alt={item.title} />
                </IonItem>
              </IonCol>
            </>
          )}
          {index % 2 === 0 && (
            <>
              <IonCol sizeSm="5" size="12">
                <IonItem>
                  <IonImg src={item.image} alt={item.title} />
                </IonItem>
              </IonCol>
              <IonCol size="12" sizeSm="6" className="ion-padding">
                <p className="large-text">{item.title}</p>
                <p>{item.detail}</p>
              </IonCol>
            </>
          )}
              </>
            ) : (
               <>
              <IonCol size="12" sizeSm="6" className="ion-padding">
                <p className="large-text">{item.title}</p>
                <p>{item.detail}</p>
              </IonCol>
              
              <IonCol sizeSm="5" size="12">
                <IonItem>
                  <IonImg src={item.image} alt={item.title} />
                </IonItem>
              </IonCol>
            </>
            )
          }
        </IonRow>
      ))}
    </IonGrid>

    </section>
  );
};
