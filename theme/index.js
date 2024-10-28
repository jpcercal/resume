const Handlebars = require("handlebars");
const path = require("path");
const sass = require("sass");
const fs = require("fs");

exports.render = ({ meta, basics, skills, certificates, languages, work }) => {
  Handlebars.registerHelper(
    "style",
    () =>
      new Handlebars.SafeString(
        sass.compile(path.join(__dirname, "style.scss")).css
      )
  );

  Handlebars.registerHelper(
    "compileSkills",
    (skills) =>
      new Handlebars.SafeString(
        skills
          .map((skill) => {
            if (!skill.meta.display) {
              return;
            }

            let skillCssClasses = [];

            skillCssClasses.push(`skill`);
            skillCssClasses.push(
              `skill-${skill.name.toLowerCase().replace(/ /g, "-")}`
            );
            skillCssClasses.push(`skill-weight-${skill.level}`);

            if (skill.meta.highlighted) {
              skillCssClasses.push(`skill-highlighted`);
            }

            return JSON.stringify({
              text: skill.name,
              weight: skill.level,
              html: {
                class: skillCssClasses.join(" "),
              },
            });
          })
          .filter(Boolean)
          .join(",")
      )
  );

  Handlebars.registerHelper(
    "compilePhoneNumber",
    (telephoneNumber) =>
      new Handlebars.SafeString(
        telephoneNumber
          .replace(/ /g, "")
          .replace(/-/g, "")
          .replace(/\(/g, "")
          .replace(/\)/g, "")
      )
  );

  Handlebars.registerHelper("compileWorkPeriod", (startDate, endDate) =>
    endDate
      ? `${new Date(startDate).getFullYear()} - ${new Date(
          endDate
        ).getFullYear()}`
      : `${new Date(startDate).getFullYear()} - Present`
  );

  const template = Handlebars.compile(
    fs.readFileSync(path.join(__dirname, "template.hbs"), "utf8")
  );
  return template({ meta, basics, skills, certificates, languages, work });
};
