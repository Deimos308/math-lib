module.exports = {
  branches: ["master"], // default branch to release from
  plugins: [
    // 1) analyse commits & create release notes
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],

    // 2) update CHANGELOG.md
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],

    // 3) **publish to GitHub Packages via pnpm**
    [
      "@semantic-release/npm",
      {
        pkgRoot: ".", // root of the package
        npmPublish: true, // run `npm publish` (=> triggers your `prepack`)
        tarballDir: "dist", // copies the .tgz here for the next step
        pkgManager: "pnpm",
      },
    ],

    // 4) commit CHANGELOG + package.json back to the repo
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],

    // 5) create a GitHub Release (nice UI, zip of source, etc.)
    "@semantic-release/github",
  ],
};
