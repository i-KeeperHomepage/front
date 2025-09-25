import { useState } from "react";
import styles from "./Rule.module.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={() => setOpen(!open)}
      >
        {title}
        <span className={styles.icon}>{open ? "−" : "+"}</span>
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
}

export default function Rule() {
  return (
    <section className={`site-container ${styles.rulePage}`}>
      <h2 className={styles.title}>i-Keeper 동아리 회칙</h2>
      <p className={styles.intro}>
        i-Keeper 동아리는 정보보안 및 개발을 중심으로 학술 연구와 교류를 목적으로 하며, 
        본 회칙은 동아리 운영의 기본 원칙을 정합니다.
      </p>

      {/* 제1장 총칙 */}
      <Accordion title="제1장 총칙">
        <h4>제1조 (명칭)</h4>
        <p>이 단체의 명칭은 영문 ‘i-Keeper’, 한글 ‘아이키퍼’라 칭한다.</p>

        <h4>제2조 (목적)</h4>
        <p>
          본 단체는 정보보안 및 소프트웨어 개발 학술 연구와 지식 공유를 목적으로 하며,
          학우 상호 간의 협력을 통해 학업과 인격의 향상에 기여한다.
        </p>
      </Accordion>

      {/* 제2장 회원 및 임원진 */}
      <Accordion title="제2장 회원 및 임원진">
        <h4>제3조 (회원의 자격)</h4>
        <p>
          ① 대구가톨릭대학교 컴퓨터공학전공에 소속된 재학생은 본 동아리의 회원이 될 수 있다.
          <br />
          ② 회원은 동아리 활동에 성실히 참여하며 회칙을 준수해야 한다.
        </p>

        <h4>제4조 (회원의 권리 및 의무)</h4>
        <p>
          ① 회원은 총회에서 의결권을 가지며, 동아리의 활동에 참여할 권리를 가진다.
          <br />
          ② 회원은 회비를 납부할 의무를 가지며, 동아리 활동을 존중해야 한다.
        </p>

        <h4>제5조 (임원진 구성)</h4>
        <p>
          ① 동아리의 원활한 운영을 위하여 임원진을 둔다.
          <br />
          ② 임원진은 회장 1인, 부회장 1인, 총무 1인, 장비관리 1인, 홍보 1인, 서버관리 1인으로 한다.
        </p>

        <h4>제6조 (임원진의 역할)</h4>
        <p>
          ① 회장은 동아리를 대표하고, 전체 운영을 총괄한다.
          <br />
          ② 부회장은 회장을 보좌하며, 회장 부재 시 직무를 대행한다.
          <br />
          ③ 총무는 회비 및 재정 관리를 담당한다.
          <br />
          ④ 장비관리는 동아리 장비 및 시설을 관리한다.
          <br />
          ⑤ 홍보는 대내외 홍보 활동을 담당한다.
          <br />
          ⑥ 서버관리는 동아리 서버의 유지 및 관리를 담당한다.
        </p>
      </Accordion>

      {/* 제3장 총회 */}
      <Accordion title="제3장 총회">
        <h4>제7조 (총회 구성)</h4>
        <p>
          ① 총회는 모든 회원으로 구성된다.
          <br />
          ② 정기총회는 학기 초와 학기 말에 개최한다.
          <br />
          ③ 임시총회는 회장 또는 임원진 과반수의 요구로 개최할 수 있다.
        </p>

        <h4>제8조 (총회의 의결)</h4>
        <p>
          ① 총회의 의결은 출석 회원 과반수의 찬성으로 한다.
          <br />
          ② 회칙 개정 및 중요 안건은 출석 회원 2/3 이상의 찬성으로 의결한다.
        </p>
      </Accordion>

      {/* 제4장 회계 및 재정 */}
      <Accordion title="제4장 회계 및 재정">
        <h4>제9조 (회계 연도)</h4>
        <p>본 동아리의 회계 연도는 매년 3월 1일부터 익년 2월 말일까지로 한다.</p>

        <h4>제10조 (재정)</h4>
        <p>
          ① 동아리의 재정은 회원 회비, 학교 지원금 및 기타 수입으로 충당한다.
          <br />
          ② 회계 내역은 총무가 관리하며, 매 학기 총회에서 보고한다.
        </p>
      </Accordion>

      {/* 제5장 보칙 */}
      <Accordion title="제5장 보칙">
        <h4>제11조 (회칙 개정)</h4>
        <p>회칙 개정은 총회 출석 회원 2/3 이상의 찬성으로 의결한다.</p>

        <h4>제12조 (기타 사항)</h4>
        <p>
          본 회칙에 규정되지 않은 사항은 관례에 따른다.
          필요한 경우 총회의 의결을 거쳐 별도의 규칙을 제정할 수 있다.
        </p>
      </Accordion>

      {/* 제6장 비상대책위원회 */}
      <Accordion title="제6장 비상대책위원회">
        <h4>제13조 (구성)</h4>
        <p>
          ① 임원진의 궐위 또는 동아리 운영이 불가능한 상황이 발생한 경우, 비상대책위원회를 구성한다.
          <br />
          ② 비상대책위원회는 임원진 및 회원 중 회장이 지명한 자로 구성한다.
        </p>

        <h4>제14조 (권한)</h4>
        <p>
          비상대책위원회는 회장 직무를 대행하며, 총회 개최 전까지 임시 운영을 담당한다.
        </p>
      </Accordion>

      {/* 부칙 */}
      <Accordion title="부칙 및 개정 이력">
        <p>
          본 회칙은 2002년 9월 제정되었으며, 이후 다음과 같이 개정되었다.
        </p>
        <ul>
          <li>2022년 5월 3일: 제1호 제정</li>
          <li>2024년 5월 24일: 제2호 개정</li>
        </ul>
      </Accordion>
    </section>
  );
}
